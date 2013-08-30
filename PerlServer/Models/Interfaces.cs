using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PerlServer.Models
{
    public interface IPoco<TEntity>
            where TEntity : class
    {
        Guid Id { get; set; }
        TEntity Cast();
        void bind(TEntity entity);
        void setDefaults();
        void save();
    }
    public interface IEntity
    {
        Guid Id { get; set; }
    }
}