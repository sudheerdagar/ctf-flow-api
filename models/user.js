const mongoose=require('mongoose')
const validator=require ('validator')
const bcrypt=require('bcryptjs')


const userSchema=new mongoose.Schema({
 
    username:{
        type:String,
        required:[true,'please tell us your name']
    },
    email:{
        type:String,
        required:[true,'an email is required for user to create an account'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlength:8,
        select:false
    },
    
});


userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
      
    //hashing of password with cost of 12
    this.password= await bcrypt.hash(this.password,12);

    // this.passwordConfirm=undefined;
    next();




})


userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
     return  await bcrypt.compare(candidatePassword,userPassword);
}



const user=mongoose.model('User',userSchema);

module.exports=user;
