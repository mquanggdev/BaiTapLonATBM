const Role = require("../../model/role.model");
const Account = require("../../model/accountAdmin.model");
const md5 = require('md5');
const generateHelper = require("../../helper/generate.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_view")){

  const records = await Account.find({
    deleted:false,
  })
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });

    record.roleTitle = role.title;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Tài khoản admin",
    records:records
  });
}
else{
  return;
}
}

// [GET] /admin/roleaccounts/create
module.exports.create = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_create")){
    const roles = await Role.find({
        deleted: false
      }).select("title");
    
      res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản admin",
        roles: roles
      });
  }else{
    return;
  }
}
// [Post] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_view")){
    if(req.body){
        req.body.password = md5(req.body.password);
        req.body.token = generateHelper.generateRandomString(30);

        const account = new Account(req.body);
        await account.save();

        req.flash("success","Thêm tài khoản thành công")
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
    else{
        req.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
  }else{
    return;
  }
  }

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_edit")){
  const id = req.params.id;

  const account = await Account.findOne({
    _id: id,
    deleted: false
  });

  const roles = await Role.find({
    deleted: false
  }).select("title");

  res.render("admin/pages/accounts/edit", {
    pageTitle: "Chinh sửa tài khoản admin",
    roles: roles,
    account: account
  });
}else{
  return;
}
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_edit")){
  const id = req.params.id;

  if(req.body.password == "") {
    delete req.body.password;
  } else {
    req.body.password = md5(req.body.password);
  }

  await Account.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhật thành công!");

  res.redirect("back");
}else{
  return;
}
}


