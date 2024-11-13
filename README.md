# Contador de Passos com Histórico e Notificações

Este projeto é um aplicativo em **React Native** usando o **Expo** que conta os passos do usuário, salva um histórico diário de contagem e permite o envio de notificações locais. O aplicativo também permite ao usuário configurar notificações diárias e visualizar um histórico de passos por meio de uma navegação em gaveta.

## Funcionalidades

- **Contador de passos**: Usa o acelerômetro para contar os passos enquanto o aplicativo está aberto.
- **Histórico diário**: Salva a contagem de passos a cada dia e permite ao usuário visualizar o histórico.
- **Notificações locais**: Configura notificações diárias e envia uma notificação de teste.
- **Navegação em gaveta**: Interface intuitiva para acessar as diferentes telas do app.

## Tecnologias e Bibliotecas Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
  - `expo-sensors` para contar passos
  - `expo-notifications` para notificações locais
- [React Navigation](https://reactnavigation.org/) para navegação em gaveta
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para salvar o histórico e preferências de notificações
- [expo-dev-client](https://docs.expo.dev/development/introduction/) para executar o app em um cliente de desenvolvimento personalizado

## Configuração e Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) 

### Passo a Passo de Instalação

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/Hayasshida/PDM-4Bi.git
   cd PDM-4Bi
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Instale as bibliotecas Expo necessárias**:
   ```bash
   npx expo install expo-sensors expo-notifications @react-navigation/drawer @react-navigation/native async-storage
   ```

4. **Executar o App**:
   -Com um cliente de desenvolvimento Expo Dev Client:
     ```bash
     npx expo run:<android || ios>
     ```

## Explicação do Código
`App.js`
O App.js configura o Drawer Navigator com duas telas:

- Home: Tela principal para iniciar/parar contagem de passos e configurar notificações.
  
- Histórico: Exibe o histórico diário de passos.

`src/screens/HomeScreen.js`

Esta tela permite ao usuário iniciar/parar a contagem de passos e configurar notificações diárias. Ela usa o Pedometer da biblioteca expo-sensors para monitorar os passos enquanto o app está em execução.

`src/screens/HistoryScreen.js`

A tela exibe o histórico diário de passos usando dados armazenados em AsyncStorage.

`src/services/notificationService.js`

Contém funções para lidar com notificações locais, como agendar e cancelar notificações diárias, além de pedir permissões.


## Uso: 
- Contar Passos: Na tela principal, clique no botão "Iniciar Contagem" para começar a contagem de passos. Clique novamente para parar.
- Configurar Notificações: Use o botão de notificação para ativar ou desativar notificações diárias.
- Ver Histórico: Navegue até a tela de Histórico para ver o registro diário de passos.

---

## Permissões
Este app requer as seguintes permissões:

- Sensores de Movimento: Para contar os passos usando o acelerômetro.
- Notificações: Para enviar notificações locais.

---

### Observações
Notificações funcionam apenas em dispositivos físicos ou em ambientes de desenvolvimento (npx expo run)

## Colaboradores:
<table>
    <tr>
        <td align="center">
            <a href="https://www.github.com/caua-guerra">
                <img
                    src="https://avatars.githubusercontent.com/caua-guerra"
                    width="100px;"
                />
                <br />
                <sub>
                    <b> Cauã Guerra </b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/lucaaroeiracrv">
                <img
                    src="https://avatars.githubusercontent.com/lucaaroeiracrv"
                    width="100px;"
                    alt="Luca Aroeira"
                />
                <br />
                <sub>
                    <b> Luca Aroeira </b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/mumuka3632">
                <img
                    src="https://avatars.githubusercontent.com/mumuka3632"
                    width="100px;"
                />
                <br />
                <sub>
                    <b> Murilo Giovani </b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/hayasshida">
                <img
                    src="https://avatars.githubusercontent.com/hayasshida"
                    width="100px;"
                />
                <br />
                <sub>
                    <b> Pedro Hayashida </b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/kohnn">
                <img
                    src="https://avatars.githubusercontent.com/kohnn"
                    width="100px;"
                />
                <br />
                <sub>
                    <b> Pedro Kohn </b>
                </sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/mockjk">
                <img
                    src="https://avatars.githubusercontent.com/mockjk"
                    width="100px;"
                />
                <br />
                <sub>
                    <b> Richard Vinicius </b>
                </sub>
            </a>
        </td>
    </tr>
