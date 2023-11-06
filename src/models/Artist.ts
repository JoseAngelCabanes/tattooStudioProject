import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Appointment } from "./Appointment"
import { Portfolio } from "./Portfolio"

@Entity("artists")
export class Artist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  surname!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  role!: string

  @Column()
  is_active!: boolean
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  appoiments!: Appointment[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.artist)
  portfolios!: Portfolio[];
}