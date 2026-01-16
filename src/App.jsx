"use client"

import { useState } from "react"
import "./App.css"
import Onboarding from "./components/Onboarding"
import WelcomeScreen from "./components/WelcomeScreen"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import HomePage from "./components/HomePage"

function App() {
  const [view, setView] = useState("onboarding")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [signupStep, setSignupStep] = useState(0)
  const [signupPseudo, setSignupPseudo] = useState("")
  const [signupFirstName, setSignupFirstName] = useState("")
  const [signupLastName, setSignupLastName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupAge, setSignupAge] = useState("")
  const [selectedAvoids, setSelectedAvoids] = useState([])
  const [signupTheme, setSignupTheme] = useState("")
  const [userSensoryProfile, setUserSensoryProfile] = useState([])

  const handleSkipLogin = () => {
    setView("home")
  }

  const handleOnboardingComplete = () => {
    setView("welcome")
  }

  const isLoginFormValid = loginEmail.trim() !== "" && loginPassword.trim() !== ""

  const handleLogin = () => {
    if (isLoginFormValid) {
      console.log("Login avec:", loginEmail, loginPassword)
      setView("home")
    }
  }

  const isSignupStepValid = () => {
    switch (signupStep) {
      case 0:
        return signupPseudo.trim() !== ""
      case 1:
        return signupFirstName.trim() !== "" && signupLastName.trim() !== "" && signupEmail.trim() !== ""
      case 2:
        return signupAge !== ""
      case 3:
        return selectedAvoids.length > 0
      case 4:
        return signupTheme !== ""
      default:
        return false
    }
  }

  const signupProgress = (signupStep / 4) * 100

  const nextSignupStep = () => {
    if (signupStep < 4 && isSignupStepValid()) {
      setSignupStep(signupStep + 1)
    } else if (signupStep === 4 && isSignupStepValid()) {
      console.log("Compte créé:", {
        signupPseudo,
        signupFirstName,
        signupLastName,
        signupEmail,
        signupAge,
        selectedAvoids,
        signupTheme,
      })
      setUserSensoryProfile(selectedAvoids)
      setView("home")
    }
  }

  const toggleAvoid = (item) => {
    if (selectedAvoids.includes(item)) {
      setSelectedAvoids(selectedAvoids.filter((i) => i !== item))
    } else {
      setSelectedAvoids([...selectedAvoids, item])
    }
  }

  const handleSignupSuccess = () => {
    setView("home")
  }

  if (view === "home") {
    return <HomePage userSensoryProfile={userSensoryProfile} onUpdateSensoryProfile={setUserSensoryProfile} />
  }

  if (view === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (view === "welcome") {
    return (
      <WelcomeScreen onLogin={() => setView("login")} onSignup={() => setView("signup")} onSkip={handleSkipLogin} />
    )
  }

  if (view === "login") {
    return (
      <LoginForm
        email={loginEmail}
        setEmail={setLoginEmail}
        password={loginPassword}
        setPassword={setLoginPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onLogin={handleLogin}
        onBack={() => setView("welcome")}
        isValid={isLoginFormValid}
      />
    )
  }

  if (view === "signup") {
    return (
      <SignupForm
        step={signupStep}
        progress={signupProgress}
        pseudo={signupPseudo}
        setPseudo={setSignupPseudo}
        firstName={signupFirstName}
        setFirstName={setSignupFirstName}
        lastName={signupLastName}
        setLastName={setSignupLastName}
        email={signupEmail}
        setEmail={setSignupEmail}
        age={signupAge}
        setAge={setSignupAge}
        selectedAvoids={selectedAvoids}
        toggleAvoid={toggleAvoid}
        theme={signupTheme}
        setTheme={setSignupTheme}
        onNext={nextSignupStep}
        onBack={() => setView("welcome")}
        isValid={isSignupStepValid()}
        onClose={() => setView("welcome")}
        onSignupSuccess={handleSignupSuccess}
      />
    )
  }

  return null
}

export default App
