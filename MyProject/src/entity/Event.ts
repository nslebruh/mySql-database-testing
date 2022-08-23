import { Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, Entity, OneToOne } from "typeorm"
import { Student } from "./Student"
import { Teacher } from "./Teacher"
import { Subject } from "./Subject"
import { Lesson } from "./Lesson"

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    description: string

    @Column()
    location: string

    @Column()
    title: string

    @Column()
    isRunning: boolean

    @Column()
    allDay: boolean

    @Column() 
    isRecurring: boolean

    @Column()
    recurUntil: Date

    @Column()
    recurFrom: Date

    @Column()
    recurForever: boolean

    @Column()
    recurrenceFrequency: number 

    @ManyToMany(() => Student, (student) => student.events)
    @JoinTable()
    students: Student[]
    
    @ManyToMany(() => Teacher, (teacher) => teacher.events)
    @JoinTable()
    teachers: Teacher[]

    @Column()
    isLesson: boolean

    @OneToOne(() => Lesson, {nullable: true})
    lesson: Lesson
}

