import type { ResumePage } from '../../../shared/types/content/resume-page'

export const buildResumePageMarkdown = (resume: ResumePage): string => {
  const lines: string[] = [
    `# ${resume.name}`,
    '',
    `[${resume.contact.email}](mailto:${resume.contact.email}) · [LinkedIn](${resume.contact.linkedin}) · [GitHub](${resume.contact.github})`,
    '',
    '## Summary',
    '',
    resume.summary,
    '',
    '## Skills',
    '',
  ]

  for (const group of resume.skills) {
    lines.push(`### ${group.category}`, '', group.items, '')
  }

  lines.push('## Experience', '')

  for (const entry of resume.experience) {
    lines.push(`### ${entry.title} — ${entry.organization}`, '')
    lines.push(`${entry.period} · ${entry.location}`, '')
    lines.push('', entry.summary, '')

    for (const highlight of entry.highlights) {
      lines.push(`- ${highlight}`)
    }

    lines.push('')
  }

  return lines.join('\n').trimEnd()
}
