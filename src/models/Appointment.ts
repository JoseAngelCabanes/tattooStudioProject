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

  @ManyToOne(() => Client, (client) => client.appoiments)
  @JoinColumn({ name: "client_id" })
  client!: Client;

  @ManyToOne(() => Artist, (Artist) => Artist.appoiments)
  @JoinColumn({ name: "Artist_id" })
  artist!: Artist;
}
