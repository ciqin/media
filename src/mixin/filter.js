export const extFilter = {
  methods:{
     /*
      *@method extFilter
      *@param {String} extName - 上传的文件名称
      *@param {String[]} condition - 允许的文件扩展名称
      *@return {Boolean} true/false - 满足要求的格式返回true，否则返回false
      */
    extFilter: function(extName,condition) {
      let nameArr = extName.split('.');
      
      if(nameArr.length>1){
              let len = nameArr.length;
              let ext = nameArr[(len-1)].toLowerCase();
              
              let index = _.findIndex(condition,(o)=>{return o == ext});
              
              if(index==-1){
                  this.$message("请输入正确格式的文件");
                  return false;
              }else{
                  return true;
              }
              
          }else{
               this.$message("请输入正确格式的文件");
               return false;
               
          }
    }
  }
}