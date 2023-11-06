import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Customer } from "./Customer"
import { Tattoo_artist } from "./Tattoo_artist"

@Entity("appointments")
export class Appointment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  customer_id!: number

  @Column()
  tattoo_artist_id!: number

  @Column()
  status!: boolean

  @Column()
  date!: Date
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @ManyToOne(() => Customer, (customer) => customer.appoiments)
  @JoinColumn({ name: "customer_id"})
  customer!: Customer;

  @ManyToOne(() => Tattoo_artist, (tattoo_artist) => tattoo_artist.appoiments)
  @JoinColumn({ name: "tattoo_artist_id"})
  tattoo_artist!: Tattoo_artist;
}