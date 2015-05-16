
function editCurrentMarkdownDocument () {
	var objApp = WizExplorerApp;
	var objWindow = objApp.Window;
	var objDocument = objWindow.CurrentDocument;

	if (objDocument == null) {
		return;
	}

	var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
	var tempPath = objCommon.GetSpecialFolder("TemporaryFolder");
	tempPath += "editor_md_temp/";
	objCommon.CreateDirectory(tempPath);
	tempPath += objDocument.GUID + "/";
	objCommon.CreateDirectory(tempPath);

	var tempFile = tempPath + "index.html";
	objDocument.SaveToHtml(tempFile, 0);

	var pluginPath = objApp.GetPluginPathByScriptFileName("md_editor.js");
	objCommon.CopyFile(pluginPath + "index.html", tempFile);
	objCommon.CopyFile(pluginPath + "md_editor_core.js", tempPath + "md_editor_core.js");

	var tempText = objCommon.LoadTextFromFile(tempFile);
	tempText = tempText.replace(/Editor.md\//g, encodeURI(pluginPath) + "Editor.md/");
	objCommon.SaveTextToFile(tempFile, tempText, "utf-8-bom");

	var editorFileName = tempFile + "?guid=" + objDocument.GUID + "&kbguid=" + objDocument.Database.KbGUID;
	objWindow.ViewHtml(editorFileName, true);
}

editCurrentMarkdownDocument();