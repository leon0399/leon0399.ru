import { useQuery } from '@tanstack/react-query'
import { type GetStaticProps, type NextPage } from 'next'
import { useEffect } from 'react'
import { useMemo, useState } from 'react'
import { isDark } from '../../utils/colors'

import Select, { type StylesConfig } from 'react-select'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Button from '../../components/atoms/Button'
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'
import { groupBy } from '../../utils/array'
import Head from 'next/head'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

enum BenchmarkType {
  Time = 'Time',
  Memory = 'Memory',
}

interface BenchmarkResult {
  tags: string[]
  time: {
    results: number[]
    median: number
    delta: number
  }
  memory: {
    results: number[]
    median: number
    delta: number
  }
}

type Benchmarks = Record<
  string, // Benchmark
  Record<
    string, // Language
    Record<
      string, // Compiler / Interpreter
      BenchmarkResult
    >
  >
>

const RESULTS_URL =
  'https://raw.githubusercontent.com/leon0399/benchmarks/master/.results/results.json'
const LANGUAGE_GROUPS: Record<string, string[]> = {
  Interpreted: ['JavaScript', 'PHP', 'Python', 'Ruby'],
  Compiled: ['C++', 'Go', 'Java', 'Kotlin', 'Rust'],
  Other: [],
}
const BENCHMARK_TITLES: Record<string, string> = {
  primes: 'Prime Numbers',
  'primes/Atkin': 'Sieve of Atkin',
  collatz: 'Collatz Conjecture',
  'collatz/MaxSequence': 'Find longest sequence',
  mandelbrot: 'Mandelbrot Set',
  'mandelbrot/Simple': 'Not-Colored',
  treap: 'Treap',
  'treap/Naive': 'Naive Implementation',
  recursion: 'Recursion',
  'recursion/Tak': 'TAK function',
  io: 'I/O',
}

interface Props {
  languageColors: Record<string, string>
}

const BenchmarksPage: NextPage<Props> = ({ languageColors }) => {
  const [selectedType, setSelectedType] = useState(BenchmarkType.Time)

  const benchmarksQuery = useQuery<Benchmarks>(['benchmarks'], async () => {
    const response = await fetch(RESULTS_URL)

    return await response.json()
  })
  const transformedResults = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(benchmarksQuery.data || {}).map(([script, langs]) => [
          script,
          Object.fromEntries(
            Object.entries(langs).flatMap(([language, _results]) => {
              return Object.entries(_results).map(
                ([configuration, _results]) => {
                  const title =
                    language === configuration
                      ? language
                      : `${language} (${configuration})`

                  const results: BenchmarkResult = {
                    tags: _results.tags,
                    time: _results.time,
                    memory: {
                      median: _results.memory.median / 1024 ** 2,
                      delta: _results.memory.delta / 1024 ** 2,
                      results: _results.memory.results.map(
                        (memory) => memory / 1024 ** 2,
                      ),
                    },
                  }

                  const { tags } = results
                  return [
                    title,
                    {
                      language,
                      tags,
                      configuration,
                      results,
                    },
                  ]
                },
              )
            }),
          ),
        ]),
      ),
    [benchmarksQuery.data],
  )

  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const languages = useMemo(
    () => [
      ...new Set(
        Object.values(benchmarksQuery.data || {}).flatMap((langs) =>
          Object.keys(langs),
        ),
      ),
    ],
    [benchmarksQuery.data],
  )
  useEffect(() => {
    setSelectedLangs(languages)
  }, [languages])

  const groupedLanguages = useMemo(() => {
    const languageGroups = Object.entries(LANGUAGE_GROUPS)

    const groups: Record<string, string[]> = Object.fromEntries(
      languageGroups.map(([k, v]) => [k, []]),
    )

    languages.forEach((lang) => {
      const group =
        languageGroups.find(([group, langs]) => langs.includes(lang))?.[0] ||
        'Other'

      groups[group].push(lang)
    })

    return Object.fromEntries(
      languageGroups.filter(([group, langs]) => langs.length !== 0),
    )
  }, [languages])

  const languageSelectOptions = useMemo(
    () =>
      Object.entries(groupedLanguages).map(([group, langs]) => ({
        label: group,
        options: langs,
      })),
    [groupedLanguages],
  )
  const languageSelectStyles = useMemo<StylesConfig<string, true>>(
    () => ({
      multiValue: (styles, { data: lang }) => ({
        ...styles,
        backgroundColor: languageColors[lang],
      }),
      multiValueLabel: (styles, { data: lang }) => ({
        ...styles,
        color:
          languageColors[lang] && isDark(languageColors[lang])
            ? '#fff'
            : '#000',
      }),
      multiValueRemove: (styles, { data: lang }) => ({
        ...styles,
        color:
          languageColors[lang] && isDark(languageColors[lang])
            ? '#fff'
            : '#000',
        ':hover': {
          backgroundColor:
            languageColors[lang] && isDark(languageColors[lang])
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
        },
      }),
    }),
    [languageColors],
  )

  const [selectedTags, setSelectedTags] = useState<string[]>(['JIT'])
  const tags = useMemo(
    () => [
      ...new Set(
        Object.entries(transformedResults).flatMap(([_, configurations]) =>
          Object.entries(configurations).flatMap(([_, { tags }]) => tags),
        ),
      ),
    ],
    [transformedResults],
  )

  const filteredResults = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(transformedResults).map(([script, results]) => [
          script,
          Object.fromEntries(
            Object.entries(results)
              .filter(([_, { language }]) => selectedLangs.includes(language))
              .filter(
                ([_, { tags }]) =>
                  !tags.length ||
                  (!selectedTags.length && !tags.length) ||
                  tags.filter((tag) => selectedTags.includes(tag)).length,
              ),
          ),
        ]),
      ),
    [transformedResults, selectedLangs, selectedTags],
  )
  const groupedResults = useMemo(() => {
    const groups = groupBy(Object.entries(filteredResults), ([k, v]) => {
      const group = k.substring(0, k.indexOf('/'))
      return BENCHMARK_TITLES[group] ?? group
    })

    return Object.fromEntries(
      Array.from(groups).map(([group, langs]) => [
        group,
        Object.fromEntries(
          langs.map(([bench, confs]) => [
            BENCHMARK_TITLES[bench] ?? bench,
            {
              labels: Object.keys(confs),

              datasets: [
                {
                  label:
                    selectedType === BenchmarkType.Memory
                      ? 'Memory, MiB'
                      : 'Time, s',
                  data: Object.values(confs).map((results) =>
                    selectedType === BenchmarkType.Memory
                      ? results.results.memory.median.toFixed(3)
                      : results.results.time.median.toFixed(3),
                  ),
                  backgroundColor: Object.values(confs).map(
                    (c) => languageColors[c.language],
                  ),
                },
              ],
            },
          ]),
        ),
      ]),
    )
  }, [filteredResults, languageColors, selectedType])

  return (
    <div className="container mx-auto">
      <Head>
        <title>Benchmarks - Leonid Meleshin</title>
      </Head>
      <article className="mx-auto">
        <ProjectHeader
          title="Benchmarks"
          category="Experiments"
          tags={['Algorithms']}
          url="https://github.com/leon0399/benchmarks"
        />
        <section className="grid gap-4 md:grid-cols-2">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="flex space-x-4"
          >
            {Object.values(BenchmarkType).map((type) => (
              <Button
                key={`type-${type}`}
                className={`
                block h-14 w-full px-16
                ${selectedType === type ? 'bg-gray-200' : ''}
              `}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <div />
          <div>
            <label htmlFor="selectLanguage" className="inline-block my-2">
              Language
            </label>
            <Select<string, true>
              id="selectLanguage"
              options={languageSelectOptions}
              isMulti
              getOptionLabel={(option) => option}
              getOptionValue={(option) => option}
              styles={languageSelectStyles}
              value={selectedLangs}
              onChange={(e) => {
                setSelectedLangs([...e])
              }}
              isLoading={benchmarksQuery.isInitialLoading}
            />
          </div>
          <div>
            <label htmlFor="selectTags" className="inline-block my-2">
              Tags
            </label>
            <Select<{ tag: string }, true>
              id="selectTags"
              options={tags.map((tag) => ({ tag }))}
              isMulti
              getOptionLabel={({ tag }) => tag}
              getOptionValue={({ tag }) => tag}
              value={selectedTags.map((tag) => ({ tag }))}
              onChange={(e) => {
                setSelectedTags([...e].map(({ tag }) => tag))
              }}
              isLoading={benchmarksQuery.isInitialLoading}
            />
          </div>
        </section>

        {Object.entries(groupedResults).map(([group, scripts]) => (
          <section key={`bench-group-${group}`} className="my-16">
            <h3 className="text-2xl font-bold py-2">{group}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(scripts).map(([script, data]) => (
                <div key={`bench-group-${group}-script-${script}`}>
                  <Bar
                    height={300}
                    data={data}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: script,
                        },
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>
    </div>
  )
}

export default BenchmarksPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json',
  )
  const colors: Record<string, { color: string }> = await response.json()

  return {
    props: {
      languageColors: Object.fromEntries(
        Object.entries(colors).map(([lang, { color }]) => [lang, color]),
      ),
    },
  }
}
