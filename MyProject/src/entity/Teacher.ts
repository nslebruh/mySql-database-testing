import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Event } from "./Event";
import { Subject } from "./Subject";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        generatedType: "STORED",
        asExpression: 'CONCAT(firstName, " ", lastName)'
    })
    fullName: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    ssid: string

    @Column()
    hasImage: boolean = false

    @Column()
    imageLocation: string = ""

    @ManyToMany(() => Subject, (subject) => subject.teachers, {onDelete: "CASCADE"})
    subjects: Subject[]

    @ManyToMany(() => Event, (event) => event.teachers)
    events: Event[]

}