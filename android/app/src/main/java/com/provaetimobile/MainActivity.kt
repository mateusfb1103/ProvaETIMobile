package com.provaetimobile

import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
// Removido os imports da Nova Arquitetura
import com.facebook.react.ReactRootView // Adicione este import se necessário

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ProvaETIMobile"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to easily enable Fabric and Concurrent React (aka React 18) with two boolean
   * flags.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    // Código simplificado sem a referência a Fabric
    return object : ReactActivityDelegate(this, mainComponentName) {
        // Este método é necessário para o react-native-screens
        override fun createRootView(): ReactRootView {
            return ReactRootView(this@MainActivity)
        }
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}