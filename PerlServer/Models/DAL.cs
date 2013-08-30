using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using PerlServer.Models;
using System.Collections.Specialized;

namespace PerlServer.Models
{
    
    
    public partial class DAL
    {
        public static Guid NA_GUID = new Guid("99999999-9999-9999-9999-999999999999");
        public static perlDbEntities getUnitOfWork()
        {
            return new perlDbEntities();
        }


        private static IQueryable<TEntity> Query<TEntity>(perlDbEntities UoW) where TEntity : class
        {
            return UoW.Set<TEntity>().AsQueryable();
        }

        public static IEnumerable<TEntity> Select<TEntity>(perlDbEntities UoW, Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return UoW.Set<TEntity>().Where(predicate).AsEnumerable();
        }
        public static IEnumerable<TEntity> Select<TEntity>(perlDbEntities UoW) where TEntity : class
        {
            return UoW.Set<TEntity>().AsEnumerable();
        }

        public static TEntity SelectFirst<TEntity>(perlDbEntities UoW, Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            TEntity result = UoW.Set<TEntity>().FirstOrDefault<TEntity>(predicate);
            if (result == null)
            {
                result = UoW.Set<TEntity>().Create();
                UoW.Set<TEntity>().Add(result);
            }
            return result;
        }
        public static TEntity Save<TEntity>(perlDbEntities UoW, TEntity entity) where TEntity : class
        {
            UoW.SaveChanges();
            return entity;
        }

        

    }
}