// src/models/Queue.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Hospital } from "./Hospital";

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tempoEspera!: number; // Em minutos

  @Column()
  pacientesNaFila!: number;

  @ManyToOne(() => Hospital, (hospital) => hospital.filas)
  hospital!: Hospital;
}
