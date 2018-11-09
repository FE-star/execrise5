
class Base{
  constructor(){
      this.cache = new Map();
  }
  on(type, callback){
      if(this.cache.has(type)){
          this.cache.get(type).push(callback);
      }else{
          this.cache.set(type, [callback]);
      }
  }
  off(type, callback){
      if(this.cache.has(type)){
          if(callback){
              let fns = this.cache.get(type);
              if(Array.isArray(fns)){
                  let index = fns.indexOf(callback);
                  if(index !== -1) fns.splice(index, 1);
              }
          }else{
              this.cache.delete(type);
          }
      }
  }
  trigger(type, data){
      let fns = this.cache.get(type);
      if(Array.isArray(fns)){
          fns.forEach(fn => {
              fn(data);
          });
      }
  }
}


module.exports = Base