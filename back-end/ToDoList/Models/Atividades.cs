using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.Models
{
    public class Atividades
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AtividadesId { get; set; }

        public string Descricao { get; set; }
        public DateTime HoraDeCriacao { get; set; }
        public bool Concluido { get; set; }
    }
}
