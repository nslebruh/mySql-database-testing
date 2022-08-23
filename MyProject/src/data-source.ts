import "reflect-metadata"
import { Student, Subject, LearningTask, Lesson, Teacher, LearningTaskSubmission, SubjectResource, StudentLearningTask, Event} from "./entity"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "clompass",
    entities: [Student, Subject, LearningTask, Lesson, Teacher, LearningTaskSubmission, SubjectResource, StudentLearningTask, Event],
    migrations: [],
    synchronize: true
})
