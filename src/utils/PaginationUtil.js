exports.getPagination = (query)=>{

  const page = parseInt(query.page)||1;
  const limit = parseInt(query.limit)||50;

  const offset=(page-1)*limit;

  return {page,limit,offset};
};