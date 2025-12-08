import { ref } from 'vue'
import { animeCatalog } from '../data/animeCatalog'
import type { Anime } from '../data/animeCatalog'

export interface MyListItem {
    id: number
    title: string
    imageUrl: string
    note: number
}

const catalog = ref<Anime[]>(animeCatalog)
const myList = ref<MyListItem[]>([])

function addToListWithNote(anime: Anime, note: number) {
    if (!myList.value.some(a => a.id === anime.id)) {
        myList.value.push({
            id: anime.id,
            title: anime.title,
            imageUrl: anime.imageUrl,
            note
        })
    }
}

function removeFromList(id: number) {
    myList.value = myList.value.filter(a => a.id !== id)
}

export function useAnimeStore() {
    return {
        catalog,
        myList,
        addToListWithNote,
        removeFromList
    }
}
