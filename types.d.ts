export interface User {
    uid: string;
    name: string;
    phone: string;
    password: string | undefined;
    email: string;
    color: string;
}

interface Subtask {
    id: string;
    title: string;
    status: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    contacts: string[] | null;
    dueDate: string;
    prio: string;
    category: string;
    subtask: Subtask[] | null;
    status: string;
}

export interface RemoteStorageType {
    users: User[];
    projects: Task[];
    keyUsers: any;
    keyProjects: any;
}

export interface LocalStorageType {
    users: User[];
    user: User;
    keyUsers: any;
    keyUser: any;
}

export interface Colors {
    colors: string[];
}

export interface TaskStatus {
    todo: number,
    done: number,
    board: number,
    progress: number,
    feedback: number,
    urgent: number
}