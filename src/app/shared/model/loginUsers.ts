export interface Users{
    token?:string;
    firstname?: string,
    lastname?: string,
    newsLetterCheck?: Boolean,
    
    userLogin?:{
        userEmail?: string;
        userPassword?: string;
    }
    termsAcceptCheck?:Boolean;
    resetPasswordToken?: String;
    resetPasswordExpires?:String;
    isAdmin?:Boolean;
    recordDate?:Date,
    updateDate?:Date,
    avatar?:String
}