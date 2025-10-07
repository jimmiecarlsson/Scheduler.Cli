using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Entities
{
    public class Guest
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Parameterlös konstruktor för EF Core
        public Guest() { }

        // Praktisk konstruktor för koden
        public Guest(string name)
        {
            Name = name;
        }
    }
}
