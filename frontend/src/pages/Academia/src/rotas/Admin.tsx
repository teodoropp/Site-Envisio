import { Routes, Route } from 'react-router-dom';
import Painel from '../paginas/admin/Painel';
import GerirCursos from '../paginas/admin/GerirCursos';
import GerirDestaques from '../paginas/admin/GerirDestaques';
import GerirCategorias from '../paginas/admin/GerirCategorias';
import GerirInscricoes from '../paginas/admin/GerirInscricoes';
import GerenciarUsuarios from '../paginas/admin/GerenciarUsuarios';
import Relatorios from '../paginas/admin/Relatorios';
import Configuracoes from '../paginas/admin/Configuracoes';

export default function RotasAdmin() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="/cursos" element={<GerirCursos />} />
      <Route path="/destaques" element={<GerirDestaques />} />
      <Route path="/categorias" element={<GerirCategorias />} />
      <Route path="/inscricoes" element={<GerirInscricoes />} />
      <Route path="/usuarios" element={<GerenciarUsuarios />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
}