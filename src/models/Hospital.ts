// src/models/Hospital.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Queue } from "./Queue";

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  endereco!: string;

  @Column()
  telefone!: string;

  @OneToMany(() => Queue, (queue) => queue.hospital)
  filas!: Queue[];
}
