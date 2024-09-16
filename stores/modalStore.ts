import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const isVisible = ref(false);
    const currentComponent = ref<string>(''); // Имя компонента в виде строки
    const currentProps = ref<object>({});

    const show = (component: string, props: object = {}) => {
        currentComponent.value = component;
        currentProps.value = props;
        isVisible.value = true;
    };

    const hide = () => {
        currentComponent.value = '';
        currentProps.value = {};
        isVisible.value = false;
    };

    return { isVisible, currentComponent, currentProps, show, hide };
});
