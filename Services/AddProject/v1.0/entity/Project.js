require('dotenv').config()
module.exports = {
    Project : class {
        project;
        constructor(project){
            this.project = project;            
        }
        getProject = ()=>{
            return this.user;
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
