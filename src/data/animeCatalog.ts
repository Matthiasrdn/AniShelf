import narutoImg from '../assets/anime/naruto.jpg'
import onePieceImg from '../assets/anime/one-piece.jpg'
import aotImg from '../assets/anime/aot.jpg'
import demonSlayerImg from '../assets/anime/demon-slayer.jpg'
import jjkImg from '../assets/anime/jjk.jpg'
import mhaImg from '../assets/anime/mha.jpg'
import fmaImg from '../assets/anime/fma.jpg'
import deathNoteImg from '../assets/anime/death-note.jpg'
import hxhImg from '../assets/anime/hxh.jpg'
import haikyuuImg from '../assets/anime/haikyuu.jpg'
import tokyoGhoulImg from '../assets/anime/tokyo-ghoul.jpg'
import saoImg from '../assets/anime/sao.jpg'

export interface Anime {
    id: number
    title: string
    description: string
    imageUrl: string
}

export const animeCatalog: Anime[] = [
    {
        id: 1,
        title: 'Naruto',
        description: "Un ninja qui rêve de devenir Hokage et d'être reconnu par son village.",
        imageUrl: narutoImg
    },
    {
        id: 2,
        title: 'One Piece',
        description: 'Luffy veut devenir Roi des pirates et trouver le One Piece.',
        imageUrl: onePieceImg
    },
    {
        id: 3,
        title: 'Attack on Titan',
        description: "L'humanité se bat contre des titans mangeurs d'hommes.",
        imageUrl: aotImg
    },
    {
        id: 4,
        title: 'Demon Slayer',
        description: 'Tanjiro devient pourfendeur de démons pour sauver sa sœur.',
        imageUrl: demonSlayerImg
    },
    {
        id: 5,
        title: 'Jujutsu Kaisen',
        description: 'Itadori ingère un doigt maudit et rejoint les exorcistes de fléaux.',
        imageUrl: jjkImg
    },
    {
        id: 6,
        title: 'My Hero Academia',
        description: "Dans un monde de héros, Deku veut devenir le numéro 1 malgré sa naissance sans alter.",
        imageUrl: mhaImg
    },
    {
        id: 7,
        title: 'Fullmetal Alchemist: Brotherhood',
        description: 'Deux frères alchimistes cherchent la pierre philosophale après une transmutation ratée.',
        imageUrl: fmaImg
    },
    {
        id: 8,
        title: 'Death Note',
        description: 'Light trouve un carnet qui permet de tuer en écrivant le nom des gens.',
        imageUrl: deathNoteImg
    },
    {
        id: 9,
        title: 'Hunter x Hunter',
        description: 'Gon souhaite devenir Hunter et retrouver son père.',
        imageUrl: hxhImg
    },
    {
        id: 10,
        title: 'Haikyuu!!',
        description: 'Hinata rêve de devenir un grand joueur de volley malgré sa petite taille.',
        imageUrl: haikyuuImg
    },
    {
        id: 11,
        title: 'Tokyo Ghoul',
        description: 'Kaneki devient mi-humain mi-goule après une transplantation inattendue.',
        imageUrl: tokyoGhoulImg
    },
    {
        id: 12,
        title: 'Sword Art Online',
        description: 'Des joueurs sont piégés dans un MMORPG mortel où la mort in-game est définitive.',
        imageUrl: saoImg
    }
]
