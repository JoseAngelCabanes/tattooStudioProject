import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
import { Artist } from "./Artist";

@Entity("appointments")
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_id!: number;

  @Column()
  artist_id!: number;

  @Column()
  status!: boolean;

  @Column()
  date!: Date;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Client, (client) => client.appointments)
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Artist, (artist) => artist.appointments)
  @JoinColumn({ name: "artist_id" })
  artist!: Artist;
}
