using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NpgsqlTypes;
using System.Globalization;
using ToDoList.Context;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AtividadesController : ControllerBase
    {
        private readonly AppDBContext _dbContext;

        public AtividadesController(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Atividades>> Get()
        {
            var Atividades = _dbContext.Atividades.OrderByDescending(a => a.AtividadesId).ToList();
            if(Atividades is null)
            {
                return NotFound();
            }
            return Atividades;
        }

        [HttpGet("{id:int}", Name = "ObterAtividade")]
        public ActionResult<Atividades> Get(int id)
        {
            var atividade = _dbContext.Atividades.FirstOrDefault(p => p.AtividadesId == id);
            if (atividade is null)
            {
                return NotFound();
            }

            return Ok(atividade);
        }


        [HttpPost]
        public ActionResult Post(Atividades atividades)
        {
            if (atividades is null)
                return BadRequest();
            if (string.IsNullOrEmpty(atividades.Descricao))
                return BadRequest();

            _dbContext.Atividades.Add(atividades);
            _dbContext.SaveChanges();

            // Usando CreatedAtRoute
            return new CreatedAtRouteResult("ObterAtividade", new { id = atividades.AtividadesId }, atividades);
        }

        [HttpDelete ("{id:int}")]
        public ActionResult Delete(int id)
        {
            var atividade = _dbContext.Atividades.FirstOrDefault(p => p.AtividadesId == id);

            if (atividade is null)
                return NotFound();

            _dbContext.Atividades.Remove(atividade);
            _dbContext.SaveChanges();
            
            return Ok(atividade);
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Atividades atividade)
        {
            if(id != atividade.AtividadesId)
                return BadRequest();

            _dbContext.Entry(atividade).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.SaveChanges();

            return Ok(atividade);
        }
    }

}
