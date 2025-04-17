import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SettingsScreen() {
  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>This app includes various settings to help you customize your experience.</ThemedText>
      
      <Collapsible title="General Settings">
        <ThemedText>
          Customize your app preferences, such as language, notifications, and more.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Privacy Settings">
        <ThemedText>
          Manage your privacy settings, such as data sharing and account visibility.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Account Settings">
        <ThemedText>
          Update your profile information, password, and manage linked accounts.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Help and Support">
        <ThemedText>
          Access FAQs, contact support, and get help with troubleshooting.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Light and Dark Mode">
        <ThemedText>
          This template has light and dark mode support. You can adjust the theme using the{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="App Information">
        <ThemedText>
          Find out the version number, app updates, and more details about the app.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
