const jose = require('jose')
let i = 0;
module.exports = {
    generateJWT: async (data)=>{
      //on check si le paramètre est un objet et si ce dernier n'est pas vide
      if(typeof data === "object" && Object.keys(data).length > 0){
        const alg = 'HS256'
        const secret = new TextEncoder().encode(process.env.SECRET_TOKEN_KEY)
        const jwt = await new jose.SignJWT({data})
          .setProtectedHeader({ alg:alg })
          .setIssuedAt()
          .setIssuer('https://www.techsphere.com/login')
          .setAudience('https://www.techsphere.com')
          .setExpirationTime('2h')
          .sign(secret)
        return jwt;
      }else{
        return false;
      }
          
    },
    decyptJWT: async(jwt)=>{
      const secret = new TextEncoder().encode(process.env.SECRET_TOKEN_KEY) 
      i++;
      try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
          issuer: 'https://www.techsphere.com/login',
          // audience: 'urn:example:audience',
        })
        return { payload: payload, header: protectedHeader }
      } catch (error) {
        
        
        //la fonction renvoie une fausse erreur les deux premières fois (token expiré)
        //on test donc trois 4 fois le token avant de renvoyer l'erreur
        if(error.claim === "exp" && i < 3)
          return "waiting"
        else if(error.claim === "exp" && i >= 4){
          i = 0;
          return "last waiting"
        }
        else
          return false
      }     
      
      
    }
}