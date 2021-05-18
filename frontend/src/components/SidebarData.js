import React from 'react'
import { RiHeartAddLine } from 'react-icons/ri'
import { VscSettingsGear } from 'react-icons/vsc'
import { BsGrid, BsQuestionCircle } from 'react-icons/bs'
import {
  AiOutlineHome,
  AiOutlineTag,
  AiOutlineShoppingCart
} from 'react-icons/ai'

export const SidebarData = [
  {
    title: 'Início',
    path: '/home',
    icon: <AiOutlineHome />
  },
  {
    title: 'Loja',
    path: '/shop',
    icon: <AiOutlineTag />
  },
  {
    title: 'Carrinho',
    path: '/cart',
    icon: <AiOutlineShoppingCart />
  },
  {
    title: 'Biblioteca',
    path: '/library',
    icon: <BsGrid />
  },
  {
    title: 'Lista de Desejos',
    path: '/wishlist',
    icon: <RiHeartAddLine />
  },
  {
    title: 'Preferências',
    path: '/settings',
    icon: <VscSettingsGear />
  },
  {
    title: 'Ajuda',
    path: '/help',
    icon: <BsQuestionCircle />
  },
]