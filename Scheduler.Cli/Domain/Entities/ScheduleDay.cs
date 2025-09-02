namespace Scheduler.Cli.Domain.Entities;
using System;
using System.Collections.Generic;
using Scheduler.Cli.Domain.ValueObjects;

    public class ScheduleDay
    {
        public DateOnly Date {  get; }

        public readonly List<ScheduleBlock> Blocks = new List<ScheduleBlock>();

        public ScheduleDay(DateOnly date)
        {
            Date = date;                    
        }

        public void AddBlock(ScheduleBlock newblock) {

            if (newblock == null) throw new ArgumentNullException(nameof(newblock));


            foreach (var existingblock in Blocks)
            {
                // Comparision to check if the block is already taken
                if (newblock.Range.Start < existingblock.Range.End &&
                    existingblock.Range.Start < newblock.Range.End)
                {
                    throw new ArgumentException($"Block overlaps with existing block.{existingblock.Range.Start} - {existingblock.Range.End}.");
                }
            }

            Blocks.Add(newblock);
        }
    }

