const systemConfig = require("../../config/system");
const Account = require("../../model/accountAdmin.model");
const Role = require("../../model/role.model");

module.exports.requireAuth = async(req,res,next) => {
   if(!req.cookies.token){
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
   }
   const account = await Account.findOne({
    token: req.cookies.token,
    deleted:false
   }).select(`fullName email phone avatar role_id`);

   if(!account){
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
   }
   const role = await Role.findOne({
      _id: account.role_id,
      deleted:false
     }).select("title permissions")
   res.locals.accounts = account ;
   res.locals.role = role;
   next();    
}