import React from 'react'
import { RiHeartAddLine } from 'react-icons/ri'
import { VscSettingsGear } from 'react-icons/vsc'
import { BsGrid, BsQuestionCircle } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi';
import {
  AiOutlineHome,
  AiOutlineTag,
} from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Início',
    path: '/home',
    icon: <AiOutlineHome />
  },
  {
    title: 'Buscar',
    path: '/search',
    icon: <AiOutlineTag />
  },
  {
    title: 'Seus Pedidos',
    path: '/orders',
    icon: <BiPackage />
  },
  {
    title: 'Carrinho',
    path: '/cart',
    icon: <FiShoppingCart />
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