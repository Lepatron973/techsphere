const CryptoJS = require('crypto-js')
require('dotenv').config()
module.exports = {
    User : class {
        user;
        constructor(user){
            this.user = user;
            //on contrôle tous les champs entrés par l'utilisateur
            for (const value in user) {
                if(value != 'password' && value != '_id')
                    this.user[value] = this.htmlspecialchars(user[value])
            }
        }
        getUser = ()=>{
            return this.user;
        }
        encryptPassword = () =>{
            if(!this.user.password || this.user.password.length === 0){
                throw new Error("Mot de passe vide ou inexistant")
            }
            else{
                this.user.password = CryptoJS.AES.encrypt(this.user.password, process.env.SECRET_PASS).toString();
                return true;
            }
        }
        decryptPassword = () =>{
            if(!this.user.password || this.user.password.length === 0){
                throw new Error("Mot de passe vide ou inexistant")
            }
            else{
                this.user.password = CryptoJS.AES.decrypt(this.user.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);
                return true;
            }
        }
        htmlspecialchars = (input)=>{
            let chars = [
                {symbole:'&',translate:'&amp;'},
                {symbole:'<',translate:'&lt;'},
                {symbole:'>',translate:'&gt;'},
                {symbole:'"',translate:'&quot;'},
            ];
            if(typeof input === "string"){
                chars.map(char=>{
                    input = input.replace(char.symbole,char.translate)
                })
                return input;
            }else{
                throw new Error("L'argument n'est pas une string")
            }
        }
        
    }
}
