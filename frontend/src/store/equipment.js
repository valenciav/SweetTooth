import { create } from 'zustand';

export const useEquipmentStore = create((set) => ({
	equipments: [],
	setEquipments: (equipments) => set({ equipments }),
	fetchEquipments: async () => {
		const res = await fetch("/api/equipments");
		const data = await res.json();
		set({ equipments: data.data });
	}
}))