import React from "react";

export default function TermosCondicoes() {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-16 font-['Inter',sans-serif] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Termos e Condições
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao aceder e utilizar o website da Envisio, concorda em cumprir os presentes
              Termos e Condições. Se não concordar com qualquer parte destes termos, não
              deverá utilizar o nosso website nem os nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Utilização do Website
            </h2>
            <p>
              O conteúdo deste website destina-se apenas a informação geral. A Envisio
              reserva-se o direito de alterar o conteúdo a qualquer momento sem aviso
              prévio. É expressamente proibida a utilização não autorizada do material
              deste website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo apresentado neste website, incluindo mas não limitado a
              textos, gráficos, logótipos e imagens, é propriedade da Envisio ou dos
              seus licenciadores, estando protegido pelas leis de propriedade intelectual
              aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Limitação de Responsabilidade
            </h2>
            <p>
              A Envisio não se responsabiliza por quaisquer danos diretos, indiretos ou
              consequenciais resultantes da utilização deste website ou de qualquer
              informação nele contida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Alterações aos Termos
            </h2>
            <p>
              A Envisio reserva-se o direito de rever e alterar estes Termos e Condições
              a qualquer momento. A continuação da utilização do website após essas
              alterações constituirá a aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Lei Aplicável
            </h2>
            <p>
              Estes Termos e Condições são regidos e interpretados de acordo com a
              legislação de Angola. Qualquer litígio será submetido à jurisdição
              exclusiva dos tribunais angolanos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
