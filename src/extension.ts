import * as vscode from 'vscode'
import { AsciinemaPlayerProvider } from './asciinemaPlayer'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(AsciinemaPlayerProvider.register(context))
}
