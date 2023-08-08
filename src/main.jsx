import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './components/global.css'
import Router from './components/Router.jsx'
import AuthProvider from './components/context/AuthProvider'
import './18n/18n'

/*
S̹̖ͪ͌͞Ą͇͇͍̖̹͛ͪ̒̚Ḑ̮̱̭̞̞̦͎̎̎I̧̞͉̱̎Ḽ̛͎̠̟̼͒̄̅̃Ḷ̸̯̼͚̪͖̌ͧͅA̷̙̹͇̤ͣ͊̇̀E̯̱̫͐̓̀́V̴͍͉͍̙̊ ̷̦͓͉͖̪ͥ̐Sͨ̂ͫ͏̜̻͎͈̘̜͔̠Ḫ̼̫̰̲̥̥͐̋͛̈͜E͖͙̣͖̪̬̿͟R̻̼͍̙̯ͪͤ̀Z̙̣͉͍̹̣͉ͬ̓̆͋͡Ơ̥̣̞͙̬͒D̪͇̟̯̯͍ͮ͗ͧ́ͅ
*/

console.log("%cЧто ты здесь делаешь?! Понравилось моя программа?", "color: #32ffce")
console.log("%cЕсть вопросы обращайся 👉 https://t.me/Sadillaev_Sherzod", "color: #32ffce")
console.log("%c—Sherzod", "color: #777777")

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loanding...</div>}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </Suspense>

)
