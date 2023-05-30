module.exports = {
    
    Sanitizer: class {
        checkLength = (input,length = 0)=>{
            if(input.length < length)
                throw new Error("String length didn't match");;
        }
        checkMail = (input)=>{
            let regex = /^[\w-\.]+@[epitech\.][\w-]{2,4}$/
            if(input.match(regex) == null)
                throw new Error("Invalid Mail");
        }
        checkPasswordStrength = (input)=>{
            let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*°#?&])[A-Za-z\d@$!%*#°?&]{8,}$/
            if(input.match(regex) == null)
                throw new Error("Weak password");
        }
        checkSpecialChar = (input)=>{
            let regex = /^<[\w]+>$|^<\\[\w]+>$/;
            if(input.match(regex) != null)
               throw new Error("Special char detected");
        }
        sanitizeUser = (user)=>{
            
            for (const [key, value] of Object.entries(user)) {
                console.log(value)
                switch (key) {
                    case 'password':
                        this.checkPasswordStrength(value)
                        break;
                    case 'email':
                        this.checkMail(value)
                        break;
                    default:
                        this.checkLength(value)
                        this.checkSpecialChar(value)
                    break;
                }
                return user;
            }
        }
    }
}