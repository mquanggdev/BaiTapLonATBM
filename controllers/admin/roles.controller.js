const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_view")){

  
  const records = await Role.find({
    deleted: false
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records
  });
}else{
  return;
}
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_create")){
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm Mới Nhóm quyền"
      });
    }else{
      return;
    }
}

// [Post] /admin/roles/create
module.exports.createPost = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_create")){
    if(req.body){
        const newRoles = new Role(req.body);
        await newRoles.save();

        req.flash("success","Thêm mới sản phầm thành công")
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
    else{
        req.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
  }else{
    return ;
  }
  }

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_edit")){
  try {
    const idRole = req.params.id ;
    const records = await Role.findOne({
      _id : idRole,
      deleted:false
    })

    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh Sửa Nhóm quyền",
      records:records
    });  
  } catch (error) {
    req.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
}else{
  return ;
}
}

// [Patch]/admin/roles/edit/:id
module.exports.editPatch = async (req ,res) => {
  if(res.locals.role.permissions.includes("roles_edit")){
  try {
    const id = req.params.id;
    await Role.updateOne({
      _id: id,
    }, req.body);

    req.flash("success", "Cập nhật danh mục thành công!");
    res.redirect(`back`);
  }
  catch(e){
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
}else{
  return ;
}
  
}

// [Patch] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_permissions")){
  const records = await Role.find({
    deleted:false
  })
  res.render("admin/pages/roles/permissions.pug", {
      pageTitle: "Phân Quyền",
      records : records
    });
  }else{
    return ;
  }
}
// [Patch] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_view")){
  const roles = req.body;
  for (const role of roles) {
    await Role.updateOne({
      _id : role.id,
      deleted:false
    },{
      permissions:role.permissions
    })
  }  
  res.json({
    code:200,
    message:"Cập nhật thành công",
  });
}else{
  return;
}
}


