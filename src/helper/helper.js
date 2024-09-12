export const catchError=(error)=>{
 const {response}=data;

 if(response?.data){
  return response?.data;
 }

 return {error:error.message|| error};

};