import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"
import { Event } from "./Event"
import { StudentLearningTask } from "./StudentLearningTask"
import { Subject } from "./Subject"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ssid: string

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
    age: number

    @Column()
    year: number

    @Column()
    form: string

    @Column()
    school: string

    @Column()
    hasImage: boolean = false

    @Column()
    imageLocation: string = ""
    
    @ManyToMany(() => Subject, subject => subject.students, {onDelete: "CASCADE"})
    subjects: Subject[]

    @OneToMany(() => StudentLearningTask, (studentlearningtask) => studentlearningtask.student, {onDelete: "CASCADE"})
    learningTasks: StudentLearningTask[]

    @ManyToMany(() => Event, (event) => event.students, {onDelete: "CASCADE"})
    events: Event[]
    
}