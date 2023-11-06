import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Artist } from "./Artist";

@Entity("portfolios")
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  artist_id!: number;

  @Column()
  image!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Artist, (artist) => artist.portfolios)
  @JoinColumn({ name: "artist_id" })
  artist!: Artist;
}
