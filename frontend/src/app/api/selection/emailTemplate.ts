export function buildEmail({ name, cpf }: { name: string; cpf: string }): string {
  return `<html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap" rel="stylesheet">
    </head>
    <style>
      html, body { overflow: hidden; width: 100%; }
      * { box-sizing: border-box }
    </style>
    <body style="overflow: hidden;">
      <div style="width: 100%; height: 100%; padding: 2rem 1rem; background-color: #182240; color: white; box-sizing: border-box;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                  <div style="display: inline-flex;">
                    <img src="https://drive.google.com/uc?export=view&id=1THknBqcMNnDBkqKDQDrWYZAsEFRUkLWD" height="250" />
                    <h1 style="font-weight: 800; font-family: 'Inter', sans-serif; text-align: center; height: min-content; margin: auto 0; font-size: 3rem;">Formulário de Seleção</h1>
                  </div>
                </td>
            </tr>
        </table>
        <hr />
        <div style="padding: 1.5rem 5rem; box-sizing: border-box; background-color: #010027; border-radius: 0.5rem;">
          <h2 style="font-family: 'Inter', sans-serif;">Nome do Candidato:</h2>
          <div style="margin-bottom: 1rem; padding: 0.3rem 1rem; font-style: italic;">${name}</div>
          <h2 style="font-family: 'Inter', sans-serif;">CPF do Candidato:</h2>
          <div style="margin-bottom: 1rem;padding: 0.3rem 1rem; font-style: italic;">${cpf}</div>
        </div>
        <hr />
        <div style="margin-top: 1rem; font-style: italic;">* Matrícula, Currículo e Histórico Acadêmico do candidato estão anexados neste email.</div>
      </div>
    </body>
  </html>`;
}
