export const buildOrderByQuery = (query: any) => {
 let orderBy = {};
 const values = Object.values(query);

 if (values.includes('newest')) {
  orderBy = {
   createdAt: 'desc',
  }
 } else if (values.includes('popular')) {
  orderBy = {
   hearts: {
    _count: 'desc',
   },
  }
 }
 return orderBy;
}
export const buildCategoryQuery = (query: any, followedCategories: string[] | undefined) => {
 const values = Object.values(query);
 let categoryQuery = {};
 if (values.includes('followed')) {
  categoryQuery = {
   category: {
    name: {
     in: followedCategories,
    },
   },
  }
 } else if (values.includes('all')) {
  categoryQuery = {};
 } else {
  categoryQuery = {
   category: {
    name: {
     in: followedCategories,
    },
   }
  };
 }
 return categoryQuery;
}