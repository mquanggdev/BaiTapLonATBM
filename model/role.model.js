const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted: {
        type:Boolean,
        default:false
        }
    },
{
    timestamps: true
  });

const Role = mongoose.model("Role" , rolesSchema , "roles");

module.exports = Role ;