"use client";

import { HiOutlineArrowRight } from "react-icons/hi2";

import { ADMIN_NAV_ITEMS } from "@components/AdminLayout";

import { Hint, Intro, ModuleArrow, ModuleCard, ModuleGrid, ModuleIconBox, ModuleText } from "./styles";

export default function AdminHomePage() {
  return (
    <>
      <Intro>
        <h2>Bem-vindo ao painel do PET</h2>
        <p>
          Este é o espaço administrativo do site do PET Computação. Selecione um módulo abaixo para gerenciar
          o conteúdo correspondente.
        </p>
      </Intro>

      <ModuleGrid>
        {ADMIN_NAV_ITEMS.map(moduleItem => (
          <li key={moduleItem.href}>
            <ModuleCard href={moduleItem.href}>
              <ModuleIconBox aria-hidden="true">{moduleItem.icon}</ModuleIconBox>
              <ModuleText>
                <strong>{moduleItem.label}</strong>
                {moduleItem.description && <small>{moduleItem.description}</small>}
              </ModuleText>
              <ModuleArrow aria-hidden="true">
                <HiOutlineArrowRight size={18} />
              </ModuleArrow>
            </ModuleCard>
          </li>
        ))}
      </ModuleGrid>

      <Hint>
        Dica: para novos módulos, registre a rota em <strong>ADMIN_NAV_ITEMS</strong> (
        <code>src/components/AdminLayout</code>) — a barra lateral e este painel a atualizam automaticamente.
      </Hint>
    </>
  );
}
