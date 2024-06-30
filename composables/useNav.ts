
export default function useNav() {
  const route = useRoute();

  const navigation = ref([
    { name: 'Articles', href: '/articles', current: false },
    { name: 'Projects', href: '/projects', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Resume', href: '/resume', current: false },
  ]);

  const updatedNavigation = computed(() => {
    return navigation.value.map((navItem) => {
      return {
        ...navItem,
        current: route.path.includes(navItem.href),
      };
    });
  });

  return { navigation: updatedNavigation };
}
