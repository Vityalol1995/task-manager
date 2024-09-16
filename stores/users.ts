import { defineStore } from 'pinia';
import { User } from "../types/task";

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([]);

    const addNewUsers = (newUsers: User[]) => {
       if (newUsers)
        newUsers.forEach((user) => {
            if (!users.value.find(u => u.name === user.name)) {
                const newId = users.value.length + 1;
                users.value.push({ id: newId, name: user.name });
            }
        });
        updateLocalStorage();
    };

    const updateLocalStorage = () => {
        localStorage.setItem('users', JSON.stringify(users.value));
    };

    const loadUsersFromLocalStorage = () => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            users.value = JSON.parse(storedUsers);
        }
    };

    loadUsersFromLocalStorage();

    watch(users, () => {
        updateLocalStorage();
    }, { deep: true });

    return { users, addNewUsers };
});
