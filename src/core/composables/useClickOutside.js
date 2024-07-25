import { ref, onMounted, onUnmounted } from "vue";

export function useClickOutside(dropdownRef) {
  const dropdownOpen = ref(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      dropdownOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return {
    dropdownOpen,
  };
}
